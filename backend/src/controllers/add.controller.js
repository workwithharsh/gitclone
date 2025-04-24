import { promises as fs } from "fs";
import path from "path";

async function addFiles(filePath) {
  // Path for the repository and staging area
  const repoPath = path.resolve(process.cwd(), ".gitclone");
  const stagePath = path.join(repoPath, "staging");

  try {
    // Create the staging area and copy files
    await fs.mkdir(stagePath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagePath, fileName));

    console.log(`File ${fileName} added to staging area.`);
  } catch (err) {
    console.error("Failed to add files", err);
    throw new Error("Failed to add files");
  }
}

export { addFiles };

