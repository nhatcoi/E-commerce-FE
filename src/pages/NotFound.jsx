import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "src/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-background to-muted/30 px-4">
      <div className="text-center">
        <h1 className="text-[150px] font-bold text-primary/10 select-none leading-none mb-4">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Button
            variant="default"
            size="lg"
            asChild
            className="gap-2"
          >
            <Link to="/">
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
