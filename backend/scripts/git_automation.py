import os
import subprocess
from github import Github

class GitAutomation:
    def __init__(self, repo_name, token):
        self.g = Github(token)
        self.repo = self.g.get_repo(repo_name)

    def run_command(self, command):
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            raise Exception(f"Command failed: {command}\n{result.stderr}")
        return result.stdout

    def prepare_branch(self, branch_name):
        self.run_command("git fetch origin")
        self.run_command(f"git checkout -B {branch_name} origin/main")

    def commit_and_push(self, branch_name, message):
        if not self.run_command("git diff --stat").strip():
            return False
        
        self.run_command("git add .")
        self.run_command(f'git commit -m "{message} [skip ci]"')
        self.run_command(f"git push -f origin {branch_name}")
        return True

    def create_pr(self, branch_name, title, body):
        return self.repo.create_pull(title=title, body=body, head=branch_name, base="main")
