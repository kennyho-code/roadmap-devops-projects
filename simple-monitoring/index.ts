import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { asset } from "@pulumi/pulumi";

function readPublicKey() {
  const keyPath = path.join(os.homedir(), ".ssh/pulumi", "id_rsa.pub");
  const file = fs.readFileSync(keyPath, "utf-8");
  return file;
}

const setupScript = new asset.FileAsset("./scripts/setup.sh");

const sshKey = new digitalocean.SshKey("my-ssh-key", {
  publicKey: readPublicKey(), // Replace with your SSH public key
  name: "my-ssh-key",
});

// Create a new Web Droplet in the nyc2 region
const web = new digitalocean.Droplet("web", {
  image: "ubuntu-20-04-x64",
  name: "web-1",
  sshKeys: [sshKey.fingerprint],
  region: digitalocean.Region.NYC2,
  size: digitalocean.DropletSlug.DropletS1VCPU1GB,
  userData: setupScript.toString(),
});

export const ipAddress = web.ipv4Address;