const WebApp = self.Telegram.WebApp;
export class AppEventHandler {
    constructor(instance) {
        this.instance = instance;
        this.viewport = {
            isStateStable: false
        };
        this.setup();
    }
    setup() {
        const conditions = this.instance.conditions;
        this.setupButtonEvents();
        this.setupInvoiceEvents();
        WebApp.onEvent('popupClosed', ({ button_id }) => {
            if (button_id) {
                this.instance._trigger(conditions.onPopupClosed);
            }
        });
        WebApp.onEvent('themeChanged', () => {
            this.instance._trigger(conditions.onThemeChanged);
        });
        WebApp.onEvent('viewportChanged', ({ isStateStable }) => {
            this.viewport.isStateStable = isStateStable;
            this.instance._trigger(conditions.onViewportChanged);
        });
        WebApp.onEvent('qrTextReceived', ({ data }) => {
            this.instance.appData.qrTextReceived = data;
            this.instance._trigger(conditions.onQrTextRecieved);
        });
        WebApp.onEvent('scanQrPopupClosed', () => {
            this.instance._trigger(conditions.onScanQrPopupClosed);
        });
        WebApp.onEvent('writeAccessRequested', ({ status }) => {
            if (status === 'allowed') {
                this.instance._trigger(conditions.onWriteAccessAllowed);
            }
            if (status === 'cancelled') {
                this.instance._trigger(conditions.onWriteAccessCancelled);
            }
        });
        WebApp.onEvent('contactRequested', ({ status }) => {
            if (status === 'sent') {
                this.instance._trigger(conditions.onContactRequestSent);
            }
            if (status === 'cancelled') {
                this.instance._trigger(conditions.onContactRequestCancelled);
            }
        });
        WebApp.onEvent('biometricManagerUpdated', () => {
            this.instance._trigger(conditions.onBMUpdated);
        });
        WebApp.onEvent('biometricAuthRequested', ({ isAuthenticated, biometricToken }) => {
            if (isAuthenticated) {
                this.instance.appBiometricManager.token = biometricToken || '';
                this.instance._trigger(conditions.onBMUpdated);
            }
        });
        WebApp.onEvent('homeScreenAdded', () => {
            this.instance._trigger(conditions.onAddedToHomeScreen);
        });
    }
    setupButtonEvents() {
        const conditions = this.instance.conditions;
        WebApp.onEvent('backButtonClicked', () => {
            this.instance._trigger(conditions.onBackButtonClicked);
        });
        WebApp.onEvent('secondaryButtonClicked', () => {
            this.instance._trigger(conditions.onSecondaryButtonClicked);
        });
        WebApp.onEvent('settingsButtonClicked', () => {
            this.instance._trigger(conditions.onSettingsButtonClicked);
        });
        WebApp.onEvent('mainButtonClicked', () => {
            this.instance._trigger(conditions.onMainButtonClicked);
        });
    }
    setupInvoiceEvents() {
        const conditions = this.instance.conditions;
        WebApp.onEvent('invoiceClosed', ({ status, url }) => {
            this.instance.appData.setCurrentInvoiceId(url);
            switch (status) {
                case 'pending':
                    this.instance._trigger(conditions.onInvoicePending);
                    break;
                case 'paid':
                    this.instance._trigger(conditions.onInvoicePaid);
                    break;
                case 'cancelled':
                    this.instance._trigger(conditions.onInvoiceCancelled);
                    break;
                case 'failed':
                    this.instance._trigger(conditions.onInvoiceFailed);
                    break;
                default:
                    this.instance._trigger(conditions.onInvoiceError);
                    break;
            }
        });
    }
}
