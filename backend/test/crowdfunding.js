const { expect } = require("chai");

describe("CrowdFunding", function () {
  let CrowdFunding;
  let crowdFunding;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    crowdFunding = await CrowdFunding.deploy();
  });

  describe("createCampaign", function () {
    it("should create a new campaign", async function () {
      const ipfsHash = "QmZbJURCp2BDaQ8nhTjDJvXE4KQWvVvdsZqQ41Zk5mTgMb";
      const target = ethers.parseEther("10"); // 10 ether
      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const category = "Medical";

      await crowdFunding.createCampaign(owner.address, ipfsHash, target, deadline, category);

      const campaign = await crowdFunding.campaigns(0);

      expect(campaign.owner).to.equal(owner.address);
      expect(campaign.ipfsHash).to.equal(ipfsHash);
      expect(campaign.target).to.equal(target);
      expect(campaign.deadline).to.equal(deadline);
      expect(campaign.category).to.equal(category);
      expect(campaign.amountCollected).to.equal(0);
    });
  });

  describe("donateToCampaign", function () {
    it("should allow donation to a campaign", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);

      await crowdFunding.createCampaign(owner.address, "QmZbJURCp2BDaQ8nhTjDJvXE4KQWvVvdsZqQ41Zk5mTgMb", ethers.parseEther("10"), Math.floor(Date.now() / 1000) + 3600, "Medical");

      await crowdFunding.connect(addr1).donateToCampaign(0, { value: ethers.parseEther("1") });

      const campaign = await crowdFunding.campaigns(0);
      expect(campaign.amountCollected).to.equal(ethers.parseEther("1"));

      const newBalance = await ethers.provider.getBalance(owner.address);

      
      expect(parseInt(parseInt(newBalance)/ 10**18)).to.equal(parseInt(parseInt(initialBalance)/10**18 + parseInt("1")));
    });
  });

});