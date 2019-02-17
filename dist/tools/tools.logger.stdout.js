"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOVE_LEFT = '\u001b[1000D';
const MOVE_UP_TO = '\u001b[_n_A';
const CLEAR_AFTER = '\u001b[J';
class StdoutController {
    constructor(stream) {
        this._areas = new Map();
        this._stream = stream;
    }
    out(content, areaId) {
        if (content.search(/[\n\r]$/gi) === -1) {
            content = `${content}\n`;
        }
        if (areaId) {
            this._outArea(content, areaId);
        }
        else {
            this._outStream(content);
        }
    }
    _outStream(content) {
        const areasHeight = this._getAreasHeight();
        let clean = '';
        if (areasHeight > 0) {
            clean += (MOVE_LEFT + MOVE_UP_TO.replace('_n_', areasHeight.toString()) + CLEAR_AFTER);
        }
        this._stream.write(`${clean}${content}`);
        if (areasHeight > 0) {
            this._redrawAreas();
        }
    }
    _outArea(content, areaId) {
        const area = this._areas.get(areaId);
        let last;
        if (!area) {
            last = { last: '', count: 0 };
        }
        else {
            last = area;
        }
        const heightAfter = this._getHeightAfterArea(areaId);
        let clean = '';
        clean += MOVE_LEFT;
        if (heightAfter > 0) {
            clean += MOVE_UP_TO.replace('_n_', heightAfter.toString());
        }
        if (last.count > 0) {
            clean += MOVE_UP_TO.replace('_n_', (last.count - 1).toString());
        }
        clean += CLEAR_AFTER;
        this._stream.write(`${clean}${content}`);
        if (heightAfter > 0) {
            this._redrawAreasAfter(areaId);
        }
        this._areas.set(areaId, {
            count: content.split(/[\n\r]/gi).length,
            last: content,
        });
    }
    _redrawAreas() {
        let out = '';
        this._areas.forEach((area) => {
            out += area.last;
        });
        this._stream.write(out);
    }
    _redrawAreasAfter(areaId) {
        let after = false;
        let out = '';
        this._areas.forEach((area, storedAreaId) => {
            if (after) {
                out += area.last;
            }
            if (areaId === storedAreaId) {
                after = true;
            }
        });
        this._stream.write(out);
    }
    _getAreasHeight() {
        let height = 0;
        this._areas.forEach((area) => {
            height += (area.count - 1);
        });
        return height;
    }
    _getHeightAfterArea(areaId) {
        let height = 0;
        let after = false;
        this._areas.forEach((area, storedAreaId) => {
            if (after) {
                height += (area.count - 1);
            }
            if (areaId === storedAreaId) {
                after = true;
            }
        });
        return height;
    }
}
exports.StdoutController = StdoutController;
//# sourceMappingURL=tools.logger.stdout.js.map