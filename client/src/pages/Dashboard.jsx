import LogoutButton from "../components/LogoutButton";
import SosForm from "../components/SosForm";
const Dashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl font-bold mb-6">🐶 Welcome to Puppy House Dashboard</h1>
        <SosForm />
    <LogoutButton />
   
  </div>
);

export default Dashboard;
