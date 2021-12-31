import { useRecoilState } from 'recoil';
import { ShowPopupAtom, PopupContentAtom, PopupTitleAtom } from '../lib/store';

const PopupProvider = () => {
  const [showPopup, setShowPopup] = useRecoilState(ShowPopupAtom);
  const [popupTitle, setPopupTitle] = useRecoilState(PopupTitleAtom);
  const [popupContent, setPopupContent] = useRecoilState(PopupContentAtom);

  return (
    <>
      <div
        className={`${showPopup ? 'flex' : 'hidden'} fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50 items-center justify-center z-50`}
        onClick={() => {
          setPopupTitle('');
          setShowPopup(false);
          setPopupContent(<></>);
        }}
      >
        <div className='bg-white px-7 py-4 mx-2 rounded-lg' onClick={(e) => e.stopPropagation()}>
          <div className='font-semibold text-xl my-2 leading-none'>{popupTitle}</div>
          {popupContent}
        </div>
      </div>
    </>
  );
};

export default PopupProvider;
