const fontkit = require('fontkit');
const fs = require('fs');
let font = fontkit.openSync('./fonts/MaterialIcons-Regular.woff');
let lookupList = font.GSUB.lookupList.toArray();
let lookupListIndexes = font.GSUB.featureList[0].feature.lookupListIndexes;

class Extractor {
    font;
    lookupList;
    lookupListIndexes;

    constructor(fontPath = '') {
        this.font = fontkit.openSync(fontPath);
        this.lookupList = font.GSUB.lookupList.toArray();
        this.lookupListIndexes = font.GSUB.featureList[0].feature.lookupListIndexes;
    }

    /**
     * Returns array of object pairs.
     */
    extract() {
        const output = [];
        let processedLigatures = [];
        this.lookupListIndexes.forEach(index => {
            let subTable = this.lookupList[index].subTables[0];
            let ligatureSets = subTable.ligatureSets.toArray();

            let leadingCharacters = [];
            subTable.coverage.rangeRecords.forEach((coverage) => {
                for (let i = coverage.start; i <= coverage.end; i++) {
                    let character = this.font.stringsForGlyph(i)[0];
                    leadingCharacters.push(character);
                }
            });

            ligatureSets.forEach((ligatureSet, ligatureSetIndex) => {

                let leadingCharacter = leadingCharacters[ligatureSetIndex];

                ligatureSet.forEach(ligature => {
                    let character = this.font.stringsForGlyph(ligature.glyph)[0];
                    let characterCode = character.charCodeAt(0).toString(16).toUpperCase();

                    let ligatureText = ligature
                        .components
                        .map(x => this.font.stringsForGlyph(x)[0])
                        .join('');

                    ligatureText = leadingCharacter + ligatureText;
                    if (processedLigatures.indexOf(ligatureText) > -1) {
                        // duplicate
                        return;
                    }
                    // characterCode = characterCode.toLowerCase();
                    output.push({
                        ligatureText: ligatureText,
                        characterCode: characterCode
                    });
                    processedLigatures.push(ligatureText);
                });
            });
        });
        return output;
    }

    toJson(outputFile = 'output.json') {
        let output = '{\n';
        const extractOutput = this.extract();
        for (let i = 0; i < extractOutput.length; i++) {
            const pair = extractOutput[i];
            output = output.concat(`    "${pair.ligatureText}": "${pair.characterCode}",\n`);
        }

        if (output.endsWith(',\n')) {
            output = output.slice(0, -2).concat('\n');
        }
        fs.writeFileSync(outputFile, output + '}');
    }

    toScss(outputFile = 'output.scss') {
        let output = '$MaterialIcons_codepoints: () !default;\n$MaterialIcons_codepoints: map-merge((\n';
        const extractOutput = this.extract();
        for (let i = 0; i < extractOutput.length; i++) {
            const pair = extractOutput[i];
            const characterCode = pair.characterCode.toLowerCase();
            output = output.concat(`    "${pair.ligatureText}": ${characterCode},\n`);
        }

        if (output.endsWith(',\n')) {
            output = output.slice(0, -2).concat('\n');
        }
        fs.writeFileSync(outputFile, output + '), $MaterialIcons_codepoints);');
    }
}

const extractor = new Extractor('./fonts/MaterialIcons-Regular.woff');
extractor.toJson('codepoints.json');
extractor.toScss('./sass/_codepoints.scss');
