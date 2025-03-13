import { rgbToHex } from './misc.js';
const WebApp = self.Telegram.WebApp;
const ButtonPositions = [
    'left',
    'right',
    'top',
    'bottom'
];
export class AppSettings {
    constructor(properties) {
        this.onStart = {};
        this.theme = {};
        this.mainButton = {};
        this.secondaryButton = {};
        /** On Start */
        this.onStart.isFullscreen = properties[0];
        this.onStart.expand = properties[1];
        this.onStart.isReady = properties[2];
        this.onStart.enableVerticalSwipes = properties[3];
        this.onStart.enableClosingConfirmation = properties[4];
        /** Theme */
        this.theme.backgroundColor = rgbToHex(properties[5]);
        this.theme.headerColor = rgbToHex(properties[6]);
        this.theme.bottomBarColor = rgbToHex(properties[7]);
        /** Main Button */
        this.mainButton.isActive = properties[8];
        this.mainButton.isVisible = properties[9];
        this.mainButton.color = rgbToHex(properties[10]);
        this.mainButton.text = properties[11];
        this.mainButton.textColor = rgbToHex(properties[12]);
        this.mainButton.hasShineEffect = (properties[13] === 0) ? false : true;
        /** Secondary Button */
        this.secondaryButton.isActive = properties[14];
        this.secondaryButton.isVisible = properties[15];
        this.secondaryButton.color = rgbToHex(properties[16]);
        this.secondaryButton.text = properties[17];
        this.secondaryButton.textColor = rgbToHex(properties[18]);
        this.secondaryButton.hasShineEffect = (properties[19] === 0) ? false : true;
        this.secondaryButton.position = ButtonPositions[properties[20]];
        this.applyAllSettings();
    }
    applyAllSettings() {
        this.applyStartSettings();
        this.applyThemeSettings();
        this.applyMainButtonSettings();
        this.applySecondaryButtonSettings();
    }
    applyStartSettings() {
        if (this.onStart.isFullscreen) {
            if (WebApp.version !== '6.0') {
                WebApp.requestFullscreen();
            }
        }
        if (this.onStart.expand) {
            WebApp.expand();
        }
        if (this.onStart.enableVerticalSwipes) {
            WebApp.enableVerticalSwipes();
        }
        else {
            WebApp.disableVerticalSwipes();
        }
        if (this.onStart.enableClosingConfirmation) {
            WebApp.enableClosingConfirmation();
        }
        else {
            WebApp.disableClosingConfirmation();
        }
    }
    applyThemeSettings() {
        WebApp.setBackgroundColor(this.theme.backgroundColor);
        WebApp.setHeaderColor(this.theme.headerColor);
        WebApp.setBottomBarColor(this.theme.bottomBarColor);
    }
    applyMainButtonSettings() {
        WebApp.MainButton.setParams({
            text: this.mainButton.text,
            color: this.mainButton.color,
            text_color: this.mainButton.textColor,
            has_shine_effect: this.mainButton.hasShineEffect,
            is_active: this.mainButton.isActive,
            is_visible: this.mainButton.isVisible
        });
    }
    applySecondaryButtonSettings() {
        WebApp.SecondaryButton.setParams({
            text: this.secondaryButton.text,
            color: this.secondaryButton.color,
            text_color: this.secondaryButton.textColor,
            has_shine_effect: this.secondaryButton.hasShineEffect,
            is_active: this.secondaryButton.isActive,
            is_visible: this.secondaryButton.isVisible,
            position: this.secondaryButton.position
        });
    }
}
