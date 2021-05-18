import React from 'react';

import ResourceManager from './ResourceManager';
import PlayGround from './PlayGround';
import PropertiesManager from './PropertiesManager';
import TilemapEditor from './TilemapEditor';
import LayerManager from './LayerManager';

import './index.scss';

function Editor() {
    return (
        <div className="editor-container grid-box">
            <div className="editor-container-left grid-box">
                <ResourceManager />
                <LayerManager />
            </div>
            <PlayGround />
            <div className="editor-container-right grid-box">
                <PropertiesManager />
                <TilemapEditor />
            </div>
        </div>
    );
}

export default Editor;
