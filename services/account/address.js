const Service      = require("../base/service");
const AddressModel = require("../../models/account/address");

class AddressService extends Service
{
    constructor(req, res, next)
    {
        super(req, res, next);
        this.addressModel = new AddressModel(req, res);
        this.lt.load("account/address");
    }

    async getAddressDetail()
    {
        let address =  await this.addressModel.getAddressDetail();
        if(address)
        {
            this.serviceResult.success()
                              .setData(address);
        }
        else
        {
            this.serviceResult.setMessage(this.lt.get("address_couldnt_be_found"))
        }
        this.send();
    }

    async getAddressList()
    {
        let addresses =  await this.addressModel.getAddressList();
        this.serviceResult.success()
                          .setData(addresses);
        this.send();
    }

    async addAddress()
    {
        let insertResult =  await this.addressModel.insert();
        if(insertResult && insertResult.insertedCount == 1)
        {
            this.serviceResult.success()
                              .setData(insertResult.ops);
        }
        else
        {
            this.serviceResult.setMessage(this.lt.get("address_couldnt_be_added"));
        }
        this.send();
    }

    async updateAddress()
    {
        let updateResult =  await this.addressModel.update();
        if(updateResult && updateResult.result.nModified == 1)
        {
            this.serviceResult.success()
                              .setMessage(this.lt.get("address_couldnt_be_updated"))
                              .setData(updateResult.ops);
        }
        else
        {
            this.serviceResult.setMessage(this.lt.get("address_couldnt_be_updated"));
        }
        this.send();
    }

    async deleteAddress()
    {
        let deleteResult =  await this.addressModel.delete();
        if(deleteResult && deleteResult.deletedCount == 1)
        {
            this.serviceResult.success()
                              .setMessage(this.lt.get("address_was_deleted"));
        }
        else
        {
            this.serviceResult.setMessage(this.lt.get("address_couldnt_be_found"));
        }
        this.send();
    }
}

module.exports = AddressService;
