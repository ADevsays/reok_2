import "../../styles/waveAnimation.css";

function WaveAnimate() {
  return (
    <div className="w-full opacity-50 overflow-y-hidden absolute bottom-0 z-[10]">
  <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150 relative top-6"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#FFD700"></stop><stop offset="95%" stopColor="#FFA500"></stop></linearGradient></defs><path d="M 0,600 L 0,150 C 104.34449760765548,113.55023923444975 208.68899521531097,77.10047846889951 301,80 C 393.31100478468903,82.89952153110049 473.5885167464115,125.14832535885168 568,139 C 662.4114832535885,152.85167464114832 770.9569377990431,138.30622009569382 871,155 C 971.0430622009569,171.69377990430618 1062.5837320574162,219.6267942583732 1156,224 C 1249.4162679425838,228.3732057416268 1344.7081339712918,189.1866028708134 1440,150 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
    <defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#FFD700"></stop><stop offset="95%" stopColor="#FFA500"></stop></linearGradient></defs><path d="M 0,600 L 0,350 C 114.63157894736838,355.4928229665072 229.26315789473676,360.9856459330144 334,375 C 438.73684210526324,389.0143540669856 533.5789473684212,411.5502392344498 616,410 C 698.4210526315788,408.4497607655502 768.4210526315788,382.8133971291866 861,358 C 953.5789473684212,333.1866028708134 1068.7368421052633,309.19617224880386 1169,308 C 1269.2631578947367,306.80382775119614 1354.6315789473683,328.4019138755981 1440,350 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>

    </div>

  );
}

export default WaveAnimate;