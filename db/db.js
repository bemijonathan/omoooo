const setQueue = require("../utils/queue");

class Record {
    #data = []
    getRecord(id) {
        if (!id) {
            return this.#data
        } else {
            let u = this.#data.find(e => e.id === id);
            console.log(u, this.#data)
            return u
        }
    }
    getUserRecord(id) {
        return this.#data.find(e => e.userId === id)
    }
    updateRecord(id, data) {
        setQueue.addAndProcess(() => {
            const datas = this.getRecord(id);
            if (datas) {
                this.#data[id - 1] = data
            }
            return data;
        });
    }
    createRecord(data) {
        return setQueue.addAndProcess(() => {
            this.#data.push({ id: this.#data.length + 1, ...data })
            console.log(this.#data)
            return this.#data[this.#data.length - 1];
        });
    }
    deleteRecord(id) {
        setQueue.addAndProcess(() => {
            this.#data = this.#data.filter(e => e.id !== id);
            return { done: 1 }
        });
    }
    dropDb() {
        setQueue.addAndProcess(() => {
            this.#data = {
                users: [],
                transactions: [],
                wallets: []
            };
            return this.#data
        });
    }
    getAllRecords() {
        return this.#data
    }
}

module.exports = Record