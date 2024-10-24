import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// Function to read public key
function readPublicKey(): string {
  try {
    // Read from default .ssh directory in home directory
    const keyPath = path.join(os.homedir(), ".ssh/pulumi", "id_rsa.pub");
    return fs.readFileSync(keyPath, "utf8").trim();
  } catch (error) {
    console.error("Error reading public key:", error);
    throw error;
  }
}

const sshKey = new digitalocean.SshKey("my-ssh-key", {
  publicKey: readPublicKey(),
});

const droplet = new digitalocean.Droplet("my-droplet", {
  image: "ubuntu-20-04-x64",
  name: "web-1",
  region: digitalocean.Region.NYC2,
  size: digitalocean.DropletSlug.DropletS1VCPU1GB,
});

export const dropletIp = droplet.ipv4Address;
