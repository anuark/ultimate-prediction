import Flag from '../components/Flag.jsx'
import BetDialog from '../components/BetDialog.jsx'

const Card = (props) => {
  const { item } = props;
  const { home, away, homeScore, awayScore, minute, predicted } = item;

  return (
    <div className={"p-6 max-w-sm mx-autorounded-xl shadow-lg border border-r-blue-100 rounded-lg" + (predicted ? ' bg-green-100' : ' bg-white')}>
      <p className="text-black text-xl text-center pb-6">November 12 2022</p>
      <div className="flex space-x-8 h-space">
        <div className="shrink-0">
          <div className="text-slate-500 text-center">{ home }</div>
          <Flag country="Iran" />
        </div>
        <div className="shrink-0 text-black m-auto">
          <div className="text-center text-lime-500">'{ minute }</div>
          <div className="">{ homeScore } - { awayScore }</div>
        </div>
        <div className="shrink-0">
          <div className="text-slate-500 text-center">{ away }</div>
          <Flag country="Qatar" />
        </div>
      </div>
      
      <BetDialog { ...item } />
    </div>
  );
}

export default Card;
