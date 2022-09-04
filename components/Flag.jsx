import 'flag-icons';

const flagsMap = {
    'Senegal': 'sn',
    'Netherlands': 'nl',
    'England': 'gb-eng',
    'Iran': 'ir',
    'Qatar': 'qa',
    'Ecuador': 'ec',
    'United States of America': 'us',
    'Wales': 'gb-wls',
    'Argentina': 'ar',
    'Saudi Arabia': 'sa',
    'Denmark': 'dk',
    'Tunisia': 'tn',
    'Mexico': 'mx',
    'Poland': 'pl',
    'France': 'fr',
    'Australia': 'au',
    'Morocco': 'ma',
    'Croatia': 'hr',
    'Germany': 'de',
    'Japan': 'jp',
    'Spain': 'es',
    'Costa Rica': 'cr',
    'Belgium': 'be',
    'Canada': 'ca',
    'Switzerland': 'ch',
    'Cameroon': 'cm',
    'Uruguay': 'uy',
    'Korea Republic': 'kr',
    'Portugal': 'pr',
    'Ghana': 'gh',
    'Brazil': 'br',
    'Serbia': 'rs',
};

const flagStyle = {
    width: '100px',
    height: '100px',
    display: 'block'
};

const Flag = props => {
    const { country } = props;
    let flagCode = flagsMap[country];
    if (!flagCode) {
        flagCode = 'hn';
    }

    return (
        <span className={`w-2 h-2 fib fi-${flagCode}`} style={flagStyle}></span>
    );
};

export default Flag;

