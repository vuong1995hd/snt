class Mobile {
    constructor(name) {
        this.name = name;
        this.battery = 100;
        this.powerOn = false;
        this.drafts = '';
        this.inbox = [];
        this.sentMessages = [];
    }

    togglePower() {
        this.powerOn = !this.powerOn;
        this.updateStatus();
    }
    updateStatus() {
        document.getElementById(`${this.name}-status`).innerText = this.powerOn ? "Bật" : "Tắt";
    }
    checkBattery() {
        if (this.battery <= 0) {
            alert("Pin đã hết! Vui lòng sạc pin.");
            return false;
        }
        return true;
    }
    consumeBattery() {
        if (this.battery > 0) {
            this.battery -= 1;
            document.getElementById(`${this.name}-battery`).innerText = this.battery;
        }
    }

    composeMessage(msg) {
        if (!this.powerOn || !this.checkBattery()) return;
        this.drafts = msg;
        this.consumeBattery();
    }

    sendMessage(receiver) {
        if (!this.powerOn || !this.checkBattery()) return;
        const message = this.drafts;
        this.sentMessages.push(message);
        const receiverMobile = mobileInstances[receiver];
        receiverMobile.receiveMessage(message);
        this.drafts = ''; // Clear the draft after sending
        this.consumeBattery();
    }

    receiveMessage(message) {
        if (!this.powerOn || !this.checkBattery()) return;
        this.inbox.push(message);
        this.consumeBattery();
    }
    checkInbox() {
        if (!this.powerOn || !this.checkBattery()) return;
        alert("Tin nhắn trong inbox: " + (this.inbox.length ? this.inbox.join(', ') : "Không có tin nhắn"));
        this.consumeBattery();
    }
}
const mobileInstances = {
    nokia: new Mobile('nokia'),
    iphone: new Mobile('iphone')
};
function togglePower(name) {
    mobileInstances[name].togglePower();
}
function composeMessage(name) {
    const message = prompt("Nhập nội dung tin nhắn:");
    mobileInstances[name].composeMessage(message);
}
function sendMessage(sender, receiver) {
    mobileInstances[sender].sendMessage(receiver);
}
function checkInbox(name) {
    mobileInstances[name].checkInbox();
}