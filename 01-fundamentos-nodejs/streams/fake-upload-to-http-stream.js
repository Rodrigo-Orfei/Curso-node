import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        if (i > 5) {
            this.push(null)
        } else {
            var buf = Buffer.from(String(i)) // Convertendo para Buffer
        }

        setTimeout(() => {
            const canContinue = this.push(buf);
            if (canContinue) {
                this._read();
            }
        }, 1000)
    }
}

const stream = Readable.toWeb(new OneToHundredStream());

fetch('http://localhost:8081', {
    method: 'POST',
    body: stream,
    duplex: 'half'
}).then(response => {
    return response.text()
}).then (data => {
    console.log(data)
})