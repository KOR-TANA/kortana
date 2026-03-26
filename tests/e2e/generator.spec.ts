import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFeatureBranch, commitAndPush } from './utils/git';
import { createPullRequest, deleteBranch } from './utils/github';
import { generator } from '../../src/generator'; // Your AI Tool

const branchName = `test-gen-${Date.now()}`;

describe('AI Code Generation E2E Pipeline', () => {
  it('should generate code and open a PR', async () => {
    // 1. Generation
    await generator.run("Create a new utility function that adds two numbers");

    // 2. Git flow
    await createFeatureBranch(branchName);
    await commitAndPush(branchName, 'feat: auto-generated code');

    // 3. API interaction
    const pr = await createPullRequest(branchName);

    expect(pr.status).toBe(201);
    expect(pr.data.html_url).toContain('/pull/');
  });

  afterAll(async () => {
    // Cleanup to prevent branch bloat
    await deleteBranch(branchName);
  });
});
