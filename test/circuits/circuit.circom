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
    component lessEq = LessEqThan(8); 
    lessEq.in[0] <== age;
    lessEq.in[1] <== ageLimit;

    out <== lessEq.out;

}

component main {public [ageLimit]} = AgeLimit();
