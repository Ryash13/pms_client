import CompanyCarousel from "@/components/custom/CompanyCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  toggleDarkMode,
  useAppDispatch,
  useAppState,
} from "@/context/AppState";
import {
  ArrowRight,
  BarChart,
  Calendar,
  ChevronRight,
  Layout,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { isDarkMode } = useAppState();
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const features = [
    {
      title: "Intuitive Kanban Boards",
      description:
        "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
      icon: Layout,
    },
    {
      title: "Powerful Sprint Planning",
      description:
        "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
      icon: Calendar,
    },
    {
      title: "Comprehensive Reporting",
      description:
        "Gain insights into your team's performance with detailed, customizable reports and analytics.",
      icon: BarChart,
    },
  ];
  return (
    <div className="min-h-screen min-w-full">
      {/* NavBar */}
      <div className="border border-b-2 shadow-md rounded-lg flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl italic font-bold text-black dark:text-white">
          Align IQ
        </h1>
        <div className="flex gap-3 items-center">
          {isDarkMode ? (
            <SunIcon
              onClick={toggleTheme}
              className="h-6 w-6 cursor-pointer dark:text-white"
            />
          ) : (
            <MoonIcon
              onClick={toggleTheme}
              className="h-6 w-6 cursor-pointer dark:text-white"
            />
          )}
          <Link to="/login">
            <Button size="lg" className="mr-4">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      {/* Hero Section */}
      <section className="min-h-[100vh] min-w-fit flex flex-col justify-center mx-auto text-center">
        <h1 className="text-7xl sm:text-xl italic lg:text-6xl dark:text-gray-300 font-extrabold gradient-title pb-6 flex flex-col">
          Deliver with precision <br />
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            Transform how you manage every project.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Our app helps teams plan, track, and collaborate on projects
          seamlessly. Stay organized, meet deadlines, and achieve your goals
          with ease..
        </p>
        <p className="text-xl mb-6 max-w-2xl mx-auto"></p>
        <div className="flex gap-4 items-center justify-center">
          <Link to="/app">
            <Button size="lg" className="mr-4">
              Get Started <ChevronRight size={18} className="ml-1" />
            </Button>
          </Link>
          <Link to="#features">
            <Button
              size="lg"
              variant="outline"
              className="dark:text-gray-300 text-gray-900"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`bg-dark-bg py-20 px-5`}>
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-200">
            Key Features
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-dark-bg">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Carousel */}
      <section className={`${isDarkMode ? "bg-black" : ""} py-20`}>
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center dark:text-gray-300">
            Trusted by Industry Leaders
          </h3>
          <CompanyCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-bg text-center px-5">
        <div className="container mx-auto text-gray-300">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h3>
          <p className="text-xl mb-12">
            Join thousands of teams already using Align IQ to streamline their
            projects and boost productivity.
          </p>
          <Link to="/register">
            <Button size="lg" className="animate-bounce">
              Start For Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
