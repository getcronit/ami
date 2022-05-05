// type alias for `verifyAge` function
// with function signature and a property with its type
type VerifyAgeFunc = {
  (age: number): boolean;
  usedBy: string;
};

// the function itself that
// satisfies the above type alias
let verifyAge = <VerifyAgeFunc>((age: number) => (age > 18 ? true : false));

// add a property called `usedBy`
verifyAge.usedBy = "Admin"; // allowed ✅.