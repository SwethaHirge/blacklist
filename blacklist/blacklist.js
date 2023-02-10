const blacklistModel = require('../model/blacklistModel')

const Blacklist = async (number) => {
    try {
        number = number.number
        console.log(number);
        const blacklisted = await blacklistModel.create({ number });
       

        if (blacklisted) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const BlacklistExist = async (number) => {
    try {
        const blacklisted = await blacklistModel.findOne({ number });
        if (blacklisted) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const isBlacklisted = async (number) => {
    try {
        const blacklisted = await blacklistModel.findOne({ number });
        if (blacklisted && blacklisted.isBlocked) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const updateIsBlacklisted = async (number) => {
    try {
        const blacklisted = await blacklistModel.findOne({ number });
        if (blacklisted.isBlocked == true) {
            const updated = await blacklistModel.findOneAndUpdate({ number }, { $set: { isBlocked: false } }, { new: true });
            if (updated) {
                return true;
            } else {
                return false;
            }
        } else if (blacklisted.isBlocked == false) {
            const updated = await blacklistModel.findOneAndUpdate({ number }, { $set: { isBlocked: true } }, { new: true });
            if (updated) {
                return true;
            } else {
                return false;
            }
        }

    } catch (error) {
        console.log(error);
    }
};



module.exports = { isBlacklisted, BlacklistExist, Blacklist, updateIsBlacklisted }