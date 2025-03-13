const WebApp = self.Telegram.WebApp;
const CloudStorage = WebApp.CloudStorage;
export class AppStorageManager {
    constructor(instance) {
        this.settingKey = '';
        this.removingTag = '';
        this.data = null;
        this.intance = instance;
        this.load();
    }
    load() {
        if (WebApp.version !== '6.0') {
            CloudStorage.getKeys((error, keys) => {
                if (!error && keys !== null) {
                    CloudStorage.getItems(keys, (error, values) => {
                        if (!error) {
                            this.data = values;
                            this.intance._trigger(this.intance.conditions.onCloudStorageLoaded);
                        }
                    });
                }
            });
        }
    }
    getValue(key) {
        const emptyValue = '';
        if (this.data) {
            const value = this.data[key];
            if (value) {
                return value;
            }
            else {
                return emptyValue;
            }
        }
        else {
            return emptyValue;
        }
    }
}
