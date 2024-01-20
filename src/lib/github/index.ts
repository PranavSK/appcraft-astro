import { env } from '@/lib/env/server'

import type { CommitMessage, FileChanges } from './graphql-client'

import { createClient } from './graphql-client'

const owner = env.GITHUB_OWNER
const repo = env.GITHUB_REPO
const stagingBranch = env.GITHUB_STAGING_BRANCH
const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
  authorization: `token ${env.GITHUB_ACCESS_TOKEN}`
}

const client = createClient({
  batch: true,
  headers,
  url: 'https://api.github.com/graphql'
})

interface DeleteFileArgs {
  collection: string
  extension: string
  slug: string
}
interface UpdateFileArgs extends DeleteFileArgs {
  body: string
  message?: string
}

export const saveFile = async ({
  body,
  collection,
  extension,
  message,
  slug
}: UpdateFileArgs) => {
  const parentCommit = await getParentCommit()
  const filePath = `src/content/${collection}/${slug}.${extension}`
  const gitMessage = {
    body: message,
    headline: `cms: ${collection}/${slug}.${extension}`
  } satisfies CommitMessage
  await createCommitOnBranch(
    stagingBranch,
    parentCommit,
    {
      additions: [
        {
          contents: Buffer.from(body).toString('base64'),
          path: filePath
        }
      ]
    },
    gitMessage
  )
}

export const deleteFiles = async (args: DeleteFileArgs[]) => {
  const parentCommit = await getParentCommit()
  const filePaths = args.map(({ collection, extension, slug }) => {
    return `src/content/${collection}/${slug}.${extension}`
  })
  const gitMessage = {
    body: `Deleted files: \n\t${filePaths.join('\n\t')}`,
    headline: `cms: delete files`
  } satisfies CommitMessage
  await createCommitOnBranch(
    stagingBranch,
    parentCommit,
    {
      deletions: filePaths.map((path) => ({ path }))
    },
    gitMessage
  )
}

async function getParentCommit() {
  const { repository } = await client.query({
    repository: {
      __args: {
        name: repo,
        owner
      },
      ref: {
        __args: {
          qualifiedName: stagingBranch
        },
        target: {
          on_Commit: {
            history: {
              __args: {
                first: 1
              },
              nodes: {
                oid: true
              }
            }
          }
        }
      }
    }
  })

  const parentCommit =
    repository?.ref?.target?.__typename === 'Commit' &&
    repository?.ref?.target?.history?.nodes?.[0]?.oid

  if (!parentCommit) {
    throw new Error('Unable to find the latest staging commit SHA')
  }
  return parentCommit
}

function createCommitOnBranch(
  newBranchName: string,
  parentCommit: unknown,
  fileChanges: FileChanges,
  message: { headline: string }
) {
  return client.mutation({
    createCommitOnBranch: {
      __args: {
        input: {
          branch: {
            branchName: newBranchName,
            repositoryNameWithOwner: `${owner}/${repo}`
          },
          expectedHeadOid: parentCommit,
          fileChanges,
          message
        }
      }
    }
  })
}
