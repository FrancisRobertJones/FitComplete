import { IAuthContext } from "@/context/authContext";
import ReactivateSubscription from "@/custom-hooks/reactivateSubscription";
import { AuthState } from "@/models/classes/Auth";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";

import { UnsubscribeDialog } from "./UnsubscribeDialog";
import { Link } from "react-router-dom";
import FeatureComingSoon from "./featureComingSoon";

interface ICardFooterContent {
    authedUser: AuthState,
    cardLevel: number | undefined,
    title: string,
    linkUrl: string
}

export const CardFooterContent = ({ authedUser, cardLevel, title, linkUrl }: ICardFooterContent) => {
    const { handleReactivation } = ReactivateSubscription();

 
    if (authedUser.isCancelling || authedUser.isActive === false) {
        return (
            <CardFooter className="flex justify-between">
                {authedUser.level === cardLevel ? (
                    <Button variant={"secondary"} onClick={() => handleReactivation(authedUser.User?.email as string)}>
                        Continue membership
                    </Button>
                ) : (
                        <FeatureComingSoon title= {title}/>
                )}
            </CardFooter>
        );
    }

    return (
        <CardFooter className="flex justify-between">
            {authedUser.level === cardLevel ? (
                <UnsubscribeDialog title={title} />
            ) : (
                <>
                    {authedUser.loggedIn && authedUser.level !== undefined ? (
                        <FeatureComingSoon title={title} />
                    ) : (
                        <Link to={linkUrl}>
                            <Button>Subscribe to {title} plan</Button>
                        </Link>
                    )}
                </>
            )}
        </CardFooter>
    );
};