import { env } from '@/lib/env/server'

import type { CommitMessage } from './graphql-client'

import { createClient } from './graphql-client'

const owner = env.GITHUB_OWNER
const repo = env.GITHUB_REPO
const prodBranch = env.GITHUB_PROD_BRANCH
const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
  authorization: `token ${env.GITHUB_ACCESS_TOKEN}`
}

const client = createClient({
  batch: true,
  headers,
  url: 'https://api.github.com/graphql'
})

interface UpdateContentFileArgs {
  body: string
  collection: string
  extension: string
  slug: string
}

export const createContentFile = async ({
  body,
  collection,
  extension,
  slug
}: UpdateContentFileArgs) => {
  // Step 1: Get the repository node id and the latest commit SHA of the Production branch
  const { parentCommit, repositoryId } =
    await getRepositoryIdAndLatestProductionCommit()

  // Step 2: Create a new branch from the latest commit SHA
  const newBranchName = `cms:${collection}/${slug}`
  await createNewBranch(newBranchName, parentCommit, repositoryId)

  // Step 3: Create a new content file in the new branch
  const filePath = `src/content/${collection}/${slug}.${extension}`
  const message = {
    headline: `Create ${collection}/${slug}.${extension}`
  } satisfies CommitMessage
  await createCommitOnBranch(
    newBranchName,
    parentCommit,
    body,
    filePath,
    message
  )

  // Step 4: Create a pull request from the new branch to the Production branch
  const prTitle = `Create ${collection}/${slug}.${extension}`
  await createPullRequest(newBranchName, repositoryId, prTitle)
}

function createPullRequest(
  newBranchName: string,
  repositoryId: string,
  prTitle: string
) {
  return client.mutation({
    createPullRequest: {
      __args: {
        input: {
          baseRefName: prodBranch,
          headRefName: newBranchName,
          repositoryId,
          title: prTitle
        }
      },
      pullRequest: {
        id: true
      }
    }
  })
}

function createCommitOnBranch(
  newBranchName: string,
  parentCommit: unknown,
  body: string,
  filePath: string,
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
          fileChanges: {
            additions: [
              {
                contents: Buffer.from(body).toString('base64'),
                path: filePath
              }
            ]
          },
          message
        }
      }
    }
  })
}

async function createNewBranch(
  newBranchName: string,
  parentCommit: unknown,
  repositoryId: string
) {
  const { createRef } = await client.mutation({
    createRef: {
      __args: {
        input: {
          name: newBranchName,
          oid: parentCommit,
          repositoryId
        }
      },
      ref: {
        id: true
      }
    }
  })
  const newBranchId = createRef?.ref?.id

  if (!newBranchId) {
    throw new Error('Unable to create a new branch')
  }
  return newBranchId
}

async function getRepositoryIdAndLatestProductionCommit() {
  const { repository } = await client.query({
    repository: {
      __args: {
        name: repo,
        owner
      },
      id: true,
      ref: {
        __args: {
          qualifiedName: prodBranch
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
  const repositoryId = repository?.id

  if (!repositoryId) {
    throw new Error('Unable to find the repository node id')
  }
  if (!parentCommit) {
    throw new Error('Unable to find the latest production commit SHA')
  }
  return { parentCommit, repositoryId }
}
