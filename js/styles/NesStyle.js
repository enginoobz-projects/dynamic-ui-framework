import * as NesSelectors from '../selectors/NesSelectors.js';
import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { NesConfig } from '../StyleConfig.js';
import { insertEmptyRule } from '../global.js';
export class NesStyle extends Style {
    constructor() {
        super(NesConfig);
        // param: border style
        // border-image - repeat: space;
        // border - image - repeat: stretch;
        //param: border width
        this.darkHighlightIntensity = 15;
        this.darkenHighlightColor = "#033669";
        this.borderInput = "";
        this.getBgDarkenHighlightRule = () => { var _a; return (_a = this.bgDarkenHighlightRule) !== null && _a !== void 0 ? _a : (this.bgDarkenHighlightRule = insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors)); };
        this.getBorderInputRule = () => { var _a; return (_a = this.borderInputRule) !== null && _a !== void 0 ? _a : (this.borderInputRule = insertEmptyRule(NesSelectors.borderInputSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = NesStyle._instance) !== null && _a !== void 0 ? _a : (NesStyle._instance = new NesStyle());
        return NesStyle._instance;
    }
    setupCustomizeEvents() {
    }
    init() {
    }
    onDisable() {
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
    }
    onSchemeColorUpdated() {
    }
    onBaseColorUpdated() {
        this.updateBorderColor();
        this.getBorderInputRule().style.setProperty('border-image-source', this.borderInput);
    }
    updateBorderColor() {
        const borderRgb = (DynamicColor.baseColor == '#ffffff') ? "rgb(255,255,255)" : "rgb(0,0,0)";
        this.borderInput = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="${borderRgb}" /></svg>')`;
    }
}
//  Singleton Pattern
NesStyle._instance = new NesStyle();
