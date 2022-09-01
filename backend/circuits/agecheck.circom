pragma circom 2.0.0; 


include "../node_modules/circomlib/circuits/comparators.circom";

template AgeLimit() {
    // private
    signal input age; 
    
    // public
    signal input ageLimit;


    // true/false
    signal output out;

    // considering max age 127
    component greaterThan = GreaterThan(8); 
    greaterThan.in[0] <== age;
    greaterThan.in[1] <== ageLimit;

    out <-- greaterThan.out;
    out === 1;
}

component main {public [ageLimit]} = AgeLimit();
