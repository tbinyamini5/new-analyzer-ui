import React, { useState } from 'react';
import WordsCloud from '../components/WordsCloud';
import { fetchApi } from '../utils/fetch';
import { mergeWith, clone } from 'lodash';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import '../styling/wordsCloudPage.scss';
import Loader from 'react-loader-spinner';
import DateRange from '../components/DateRange';
import { dateUtils } from '../utils/dateUtils';

const WordsCloudPage = () => {

    const [wordsCounts, setWordsCounts] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [loading, setLoading] = useState(false);

    const callback = (from, to) => {
        setFrom(from);
        setTo(to);
    }

    const mergeCounts = (objValue, srcValue) => {
        if (!isNaN(objValue) && !isNaN(srcValue)) {
            return objValue + srcValue;
        }  
    }

    const onLoadButtonClick = async () => {
        setLoading(true);
        setWordsCounts([]);

        const fetchArray = [];
        const date = clone(to);
        const DifferenceInDays = dateUtils.calcDatesDifferenceInDays(from, to);

        let i;
        for ( i = 0; i < DifferenceInDays; i++) {
            const fetchDate = dateUtils.dateToStringFormat(date);
            const requestBody = { from: fetchDate, to: fetchDate };
            fetchArray.push(fetchApi.post('http://localhost:8080/bbc-news/count-words', requestBody));
            date.setDate(date.getDate() - 1);
        }
        try {
            Promise.all(fetchArray).then(values => {
                let j;
                let mergedValues = values[0];
                for( j = 1; j < values.length; j++ ) {
                    mergeWith(mergedValues, values[j], mergeCounts);
                }
                const wordsToOccurencies = Object.entries(mergedValues).map(entry => ({ value: entry[0] , count: entry[1] }));
                setWordsCounts(wordsToOccurencies);
                setLoading(false);
            });
        }
        catch (error){
            console.log(error);
        }
    };  

    return(
        <div>
            <div id='words-cloud-container'>
                <div class='dates-container'>
                    <DateRange callback={callback} />
                    <button type="button" onClick={() => onLoadButtonClick()}>Load</button>
                </div>
                {loading
                    ? <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={80}
                        width={80} />
                    : <WordsCloud data={wordsCounts} />
                }
            </div>
        </div>
    )
};

export default WordsCloudPage;