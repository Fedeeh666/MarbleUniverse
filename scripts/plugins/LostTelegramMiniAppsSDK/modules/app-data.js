export class AppData {
    constructor() {
        this.invoices = [];
        this._currentInvoiceId = '';
        this.popupInfo = {
            buttons: []
        };
        this.locationInfo = null;
        this.lastChatMemberUserStatus = '';
        this.qrTextReceived = '';
    }
    ;
    getPopupButtons() {
        const buttons = new Array(...this.popupInfo.buttons);
        this.popupInfo.buttons = [];
        return buttons;
    }
    addPopupButton(button) {
        const buttons = this.popupInfo.buttons;
        if (buttons.length < 3) {
            buttons.push(button);
        }
    }
    setCurrentInvoiceId(invoiceUrl) {
        const invoices = this.invoices.filter(i => i.url === invoiceUrl);
        if (invoices.length === 1) {
            this._currentInvoiceId = invoices[0].id;
        }
        else {
            this._currentInvoiceId = '';
        }
    }
    addInvoice(...invoices) {
        this.invoices.push(...invoices);
    }
    getInvoiceStatus(invoiceId) {
        const invoices = this.invoices.filter(i => i.id === invoiceId);
        if (invoices.length === 1) {
            return invoices[0].status;
        }
        else {
            return '';
        }
    }
    getInvoiceUrl(invoiceId) {
        const invoices = this.invoices.filter(i => i.id === invoiceId);
        if (invoices.length === 1) {
            return invoices[0].url;
        }
        else {
            return '';
        }
    }
    get currentInvoiceId() {
        return this._currentInvoiceId;
    }
}
