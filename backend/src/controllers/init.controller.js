import { promises as fs } from "fs";
import path from "path";

async function initRepo() {
  // Path for the repository and commits directory
  const repoPath = path.resolve(process.cwd(), ".gitclone");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Create the repository and files recursively
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      // JSON.stringify({ bucket: process.env.AWS_BUCKET_NAME })
      JSON.stringify({ bucket: "git-bucket" })
    );

    console.log("Repository initialized successfully!");
  } catch (err) {
    console.error("Failed to initialize repository", err);
    throw new Error("Failed to initialize repository");
  }
}

export { initRepo };

