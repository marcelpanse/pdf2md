// @flow

import { sortByX } from '../util/page-item-functions.jsx'

/*::
import TextItem from './TextItem.jsx'
*/

//Groups all text items which are on the same y line
export default class TextItemLineGrouper {

    constructor(options) {
        this.mostUsedDistance = options.mostUsedDistance || 12;
    }

    // returns a CombineResult
    group(textItems /*: TextItem[] */) /*: TextItem[][] */ {
        const lines = [];
        var currentLine = [];
        textItems.forEach(item => {
            if (currentLine.length > 0 && Math.abs(currentLine[0].y - item.y) >= this.mostUsedDistance / 2) {
                lines.push(currentLine);
                currentLine = [];
            }
            currentLine.push(item);
        });
        lines.push(currentLine);

        lines.forEach(textItems => {
            // we can't trust order of occurence, esp. footnoteLinks like to come last
            sortByX(textItems);
        });
        return lines;
    }

}
