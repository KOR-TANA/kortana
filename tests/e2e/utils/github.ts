import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const createPullRequest = async (head: string, base: string = 'main') => {
  return await octokit.rest.pulls.create({
    owner: process.env.REPO_OWNER!,
    repo: process.env.REPO_NAME!,
    title: `E2E: Auto-gen ${head}`,
    head,
    base,
  });
};

export const deleteBranch = async (branchName: string) => {
  await octokit.rest.git.deleteRef({
    owner: process.env.REPO_OWNER!,
    repo: process.env.REPO_NAME!,
    ref: `heads/${branchName}`,
  });
};
