import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../css/index.css";
import { getUserById } from "../api/userApi";
import defaultImage from "../assets/images/default.png";
import OtherUserHeader from "../components/otherUserInfo/OtherUserHeader";
import OtherUserCourse from "../components/otherUserInfo/OtherUserCourse";
// test Page : http://localhost:5173/other-user-info/675fd765c8bfa141c295e5c1

export default function OtherUserInfo() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cardMap = new Map();
    const fetchData = async () => {
      try {
        const userData = await getUserById(`${userId}`);
        setUserInfo(userData);
        console.log("userInfo", userData, userInfo);
        if (Array.isArray(userData?.posts)) {
          userData.posts.forEach((post: Course) => {
            const titleData: Title = JSON.parse(post?.title || "{}");
            const location =
              Array.from(
                new Set(
                  titleData.locationObjs?.map((item: LocationObj) => {
                    const locationArr = item.locationAddress?.split(" ") || [];
                    if (locationArr[0] === "서울특별시")
                      return `서울 ${locationArr[1]}`;
                    else return `${locationArr[0]} ${locationArr[1]}`;
                  }) || []
                )
              ).join(", ") || "주소";

            const result = {
              id: post?._id || "",
              courseTitle: titleData.courseTitle || "제목",
              courseDescription: titleData.courseDescription || "",
              likes: post?.likes?.length || 0,
              locationAddress: location,
              image: post.image || defaultImage,
            } as CardData;

            const uniqueKey = JSON.stringify(result.courseTitle);
            const ALL_CHANNEL_ID = "675e6ed26ada400ee6bec120";

            if (!cardMap.has(uniqueKey) && post.channel === ALL_CHANNEL_ID) {
              // 중복이 없고, 전체 채널에 있는 것만 추가
              cardMap.set(uniqueKey, result);
            }
          });
          setCardsData(Array.from(cardMap.values()));
        } else {
          // post가 없는 경우
          setCardsData([]);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setCardsData([]);
      }
    };
    fetchData();
  }, []);

  if (userInfo) {
    return (
      <>
        <div className="relative flex flex-col items-center min-h-[1000px] mx-auto mb-[200px]">
          {/* blur blue*/}
          <div className="absolute blur-bg-center z-[-10]" />

          {/* glass 창 */}
          <div className={`absolute top-[117px] pb-[150px]`}>
            <div
              className={`flex flex-col items-center w-[647px] h-full bg-primary-300/15 rounded-[25px] 
            border-2 border-white z-10 shadow-default py-20 min-h-[960px]`}
            >
              {/* 창 안의 요소 */}
              <div className="relative flex flex-col items-center mt-[35px] h-full w-[555px]">
                {/* 프로필 요소 */}
                <OtherUserHeader
                  profileImg={userInfo.image}
                  userName={userInfo.fullName}
                  userEmail={userInfo.email}
                />
                <div className="flex flex-col items-center">
                  {/* 탭 영역 */}
                  <div className="flex flex-row items-center gap-3 mt-[35px] relative">
                    {/* 클릭 시 이동할 배경요소 */}
                    <div
                      className={`absolute z-10 bg-white/70 rounded-[17px] w-[88px] h-[33px]`}
                    />
                    <div
                      className={`rounded-[17px] w-[88px] h-[33px] flex items-center justify-center z-20`}
                    >
                      <p
                        className={`font-pretendard font-semiBold text-[16px] text-primary-700`}
                      >
                        코스 목록
                      </p>
                    </div>
                  </div>
                </div>
                {/* 마이페이지 - 카테고리 탭 */}
                {cardsData.length > 0 ? (
                  <OtherUserCourse targetUserData={cardsData} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return navigate("/404");
}
