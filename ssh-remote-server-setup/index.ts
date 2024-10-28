import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

function readPublicKey(): string {
  const sshKeyPath = path.resolve(os.homedir(), ".ssh/pulumi", "id_rsa.pub");
  return fs.readFileSync(sshKeyPath, "utf-8").trim();
}

const sshKey = new digitalocean.SshKey("my-ssh-key", {
  publicKey: readPublicKey(),
});

const web = new digitalocean.Droplet("web", {
  image: "ubuntu-20-04-x64",
  name: "web-1",
  region: digitalocean.Region.NYC2,
  size: digitalocean.DropletSlug.DropletS1VCPU1GB,
  sshKeys: [sshKey.fingerprint],
});

export const ipAddress = web.ipv4Address;
