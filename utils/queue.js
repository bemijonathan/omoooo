
class Queue {
    data = []
    addAndProcess(callback) {
        this.data.push(() => callback)
        let id = this.data.length - 1;
        return this.process(id)

    }
    process(id) {
        const x = this.data[id]()
        return x ()
    }
    
}

const q = new Queue()

module.exports = q