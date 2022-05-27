import carCard from '../../img/car-card.webp'
import giutarMan from "../../img/guitarman.webp"


const HomeBigCard = () => {
  return (
    <>
      <div className="  ">
        <div className="absolute ml-[9rem] top-[12rem] w-[35rem] h-[10rem] hover:opacity-50 transition hover:duration-500 hover:ease-linear">
          <img
            className="	"
            src={giutarMan}
          />

          <div className="absolute top-[10rem] text-white left-[3rem]  ">
            <button className="bg-sky-500 w-16 h-6">music</button>
            <h1 className="w-[25rem] text-[30px] mt-[1rem] ">
              What Your Music Preference Says About You and Your Personality.
            </h1>
          </div>

          <div className="absolute top-[21.5rem] text-white left-[3rem] flex w-[20rem] ">
            <img
              className="w-[1rem] h-[1.5rem] mt-2 rounded-[90px] "
              src={carCard}
            />

            <p className="mt-1 ml-2 ">John Dow</p>
            <p className="mt-1 ml-2"> . December 29, 2017 </p>
          </div>
        </div>

        <div className="absolute right-[11rem] top-[12rem] w-[17rem] hover:opacity-50 transition hover:duration-500 hover:ease-linear">
          <img
            className=" w-[17rem] h-[13rem] "
            src={carCard}
          />

          <div className="absolute top-[4.5rem] text-white left-[1.5rem]  ">
            <button className="bg-green-500 text-[15px] w-[6rem] h-6">management </button>
            <h1 className="w-[10rem] text-[12px] mt-[1rem] ">
              What Your Music Preference Says About You and Your Personality.
            </h1>
          </div>

          <div className="absolute text-[10px] text-white top-[10.7rem] left-[1.5rem] flex w-[14rem] bg-red- ">
            <img
              className="w-[1rem] rounded-[90px] "
              src="https://preview.colorlib.com/theme/philosophy/images/avatars/xuser-03.jpg.pagespeed.ic.zxKv6LRWqd.webp"
            />

            <p className="mt-1 ml-2 hover:text-white cursor-pointer">
              John Dow
            </p>
            <p className="mt-1 ml-2"> . December 29, 2017 </p>
          </div>
        </div>

        <div className="absolute right-[11rem] top-[24.3rem] w-[17rem] h-[12rem] bg-red-400 hover:opacity-50 transition hover:duration-500 hover:ease-linear">
          <img
            className=" w-[19rem] h-[13rem] "
            src="https://preview.colorlib.com/theme/philosophy/images/thumbs/small/xbeetle-150.jpg.pagespeed.ic.M0NVu_ANrc.webp"
          />

          <div className="absolute top-[4.5rem] text-white left-[1.5rem]  ">
            <button className="bg-green-500 text-[15px] w-[6rem] h-6">management </button>
            <h1 className="w-[10rem] text-[12px] mt-[1rem] ">
              What Your Music Preference Says About You and Your Personality.
            </h1>
          </div>
          <div className="absolute text-[10px] text-white top-[10.7rem] left-[1.5rem] flex w-[14rem] bg-red- ">
            <img
              className="w-[1rem] rounded-[90px] "
              src="https://preview.colorlib.com/theme/philosophy/images/avatars/xuser-03.jpg.pagespeed.ic.zxKv6LRWqd.webp"
            />

            <p className="mt-1 ml-2">John Dow</p>
            <p className="mt-1 ml-2"> . December 29, 2017 </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBigCard;
