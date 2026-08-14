// routes/index.tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefalutPageLoader from "../Loaders/DefalutPageLoader";

// Import Header and Footer into the router context
import Header from "../pages/landingpage/components/Header";
import Footer from "../pages/landingpage/components/Footer";
import AuthSuccess from "@/pages/AuthSuccess";

// Page lazy imports
const LandingPage = lazy(() => import("../pages/landingpage/LandingPage"));
const SignInPage = lazy(() => import("../pages/signin/SignInPage"));
const SignUpPage = lazy(() => import("../pages/signup/SignUpPage"));
const FindColleges = lazy(() => import("../pages/find_colleges/FindColleges"));
const UniversityAndCollegeRankings = lazy(
  () => import("../pages/university_ranking/UniversityAndCollegeRankings"),
);
const EntranceExams = lazy(
  () => import("../pages/enterance_exam/EntranceExams"),
);
const CompareColleges = lazy(
  () => import("../pages/compare_colleges/CompareColleges"),
);
const CollegePredictor = lazy(
  () => import("../pages/college_predictor/CollegePredictor"),
);

const AboutUs = lazy(() => import("../pages/aboutus/AboutUs"));
const BlogLists = lazy(() => import("../pages/institutes_blogs/BlogLists"));
const ContactUs = lazy(() => import("@/pages/contactus/ContactUs"));
const AssessmentTest = lazy(
  () => import("@/pages/assessment_test/AssessmentTest"),
);
const Profile = lazy(() => import("@/pages/profile/Profile"));
const UniversityDetail = lazy(() => import("@/pages/UniversityDetail"));
const ExamDetail = lazy(() => import("@/pages/ExamDetail"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));

// 1. Define a global layout component
const RootLayout = () => {
  return (
    <>
      <Header />
      {/* Outlet renders whichever child route is currently active */}
      <Outlet />
      <Footer />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "signin", // Matches "/signin"
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: "signup", // Matches "/signup"
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "find-colleges",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <FindColleges />
          </Suspense>
        ),
      },
      {
        path: "institute/:id",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <UniversityDetail />
          </Suspense>
        ),
      },
      {
        path: "universities-and-colleges-ranking",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <UniversityAndCollegeRankings />
          </Suspense>
        ),
      },
      {
        path: "enterance-exams",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <EntranceExams />
          </Suspense>
        ),
      },
      {
        path: "exam/:id",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <ExamDetail />
          </Suspense>
        ),
      },
      {
        path: "college-comparision",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <CompareColleges />
          </Suspense>
        ),
      },
      {
        path: "college-predictor",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <CollegePredictor />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <BlogLists />
          </Suspense>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <BlogDetail />
          </Suspense>
        ),
      },

      {
        path: "contact",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "assesment-test",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <AssessmentTest />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<DefalutPageLoader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth/success",
    element: <AuthSuccess />,
  },
]);
