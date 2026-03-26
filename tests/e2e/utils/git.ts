import simpleGit from 'simple-git';

export const git = simpleGit();

export const createFeatureBranch = async (branchName: string) => {
  await git.checkoutLocalBranch(branchName);
};

export const commitAndPush = async (branchName: string, message: string) => {
  await git.add('.');
  await git.commit(message);
  await git.push('origin', branchName);
};
