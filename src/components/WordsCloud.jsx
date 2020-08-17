import React from 'react';
import { TagCloud } from 'react-tagcloud';

const WordsCloud = ({data}) => {

    return (
        <div id='words-cloud'>
            <TagCloud
                minSize={10}
                maxSize={200}
                tags={data} />
        </div>
    );

};

export default WordsCloud;