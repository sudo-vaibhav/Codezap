# Codezap Codeathon Platform

# Quirks of the system

## Problems

- You can have problems that either belong to a contest or not belong to contest (those will be practice problems). the problems that have a contest associated will only be accessible to participants of contest and that too only within the given contest time period. However, creators/admin of contest can see those problems at any time.

## Leaderboard

The leaderboard computation would be of the overall contest only and not individual problems, the computation would happen through a standalone function which will get fired every "n" minutes (depends on length of contest) to recalculate the leaderboard because computing leaderboard again and again everytime user makes a certain request would again be very slow. Also to bypass that "n" minute cycle time, we could also manually compute instantly on hitting an endpoint made specifically for this but nobody would have this control except the superadmin.

the theoretically expected time complexity of this computation would be big_theta(number_of_participants\*number_of_problems) which is not that good as its like N^2 for each computation cycle but that is good enough since we have a few minutes to compute it
