import Flag from '../components/Flag.jsx'
import BetDialog from '../components/BetDialog.jsx'

const Card = (props) => {
    const { item } = props;
    const { home_team, away_team, home_score, away_score, minute, date, predicted, status } = item;
    const _date = new Date(date)
    const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className={"p-6 max-w-sm mx-autorounded-xl shadow-lg border border-r-blue-100 rounded-lg" + (predicted ? ' bg-green-100' : ' bg-gray-100')}>
            <p className="text-black text-xl text-center pb-6">{_date.toLocaleDateString('en-EN', dateOpts)}</p>
            <div className="flex flex-row space-x-2 h-space">
                <div className="shrink-0">
                    <p className="text-slate-500 text-center w-24 h-16 pt-2">{home_team}</p>
                    <Flag country={home_team} />
                </div>
                <div className="shrink-0 text-black m-auto mb-10">
                    {status == 'playing' ? (
                        <div className="text-center text-lime-500">&apos;{minute}</div>
                    ) : ''}
                    <div className="">{home_score} - {away_score}</div>
                </div>
                <div className="shrink-0">
                    <div className="text-slate-500 text-center w-24 h-16 pt-2">{away_team}</div>
                    <Flag country={away_team} />
                </div>
            </div>

            <BetDialog {...item} />
        </div>
    );
}

export default Card;
