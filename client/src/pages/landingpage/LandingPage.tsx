import BookCounselling from "./components/BookCounseling";
import CollegeRankings from "./components/CollegeRankings";
import ExplorePrograms from "./components/ExplorePrograms";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import StudyDestinations from "./components/StudyDestinations";
import TopEntranceExams from "./components/TopEntranceExams";
import TopUniversities from "./components/TopUniversities";
import UniversityNews from "./components/UniversityNews";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-bg-main">
      <HeroSection />
      <ExplorePrograms />
      <TopUniversities />
      <CollegeRankings />
      <StudyDestinations />
      <TopEntranceExams />
      <UniversityNews limit={3} showHeader={true} showFooterButton={true} />
      <div id="bookcounselling">
        <BookCounselling />
      </div>
    </div>
  );
}
