import os
from git_automation import GitAutomation

def run_pipeline(task_id, generated_code_dir):
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    branch = f"ai-gen/{task_id}"
    
    git = GitAutomation(repo, token)
    
    try:
        git.prepare_branch(branch)
        # Logic to move files from generated_code_dir to working directory here
        if git.commit_and_push(branch, f"feat: [AI] Update for {task_id}"):
            git.create_pr(branch, f"AI Generation: {task_id}", "Automated PR from AI Engine.")
            print(f"PR created for {task_id}")
        else:
            print("No changes to commit.")
    except Exception as e:
        print(f"Pipeline failed: {e}")
        exit(1)

if __name__ == "__main__":
    run_pipeline("task-123", "./output")