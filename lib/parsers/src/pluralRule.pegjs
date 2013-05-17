/* Rules for parsing plural rules from CLDR as specified at 
 * http://www.unicode.org/reports/tr35/tr35-29.html#Language_Plural_Rules
 */
start = CONDITION

CONDITION
    = and:AND_CONDITIONS SPACE+ 'or'i SPACE+ conds:CONDITION { conds.unshift(and); return conds; }
    / and:AND_CONDITIONS { return [and]; }

AND_CONDITIONS
    = rel:RELATION SPACE+ 'and'i SPACE+ rels:AND_CONDITIONS { rels.unshift(rel); return rels; }
    / rel:RELATION { return [rel]; }

RELATION
    = IS_RELATION / IN_RELATION / WITHIN_RELATION

IS_RELATION
    = expr:EXPRESSION SPACE+ 'is'i SPACE+ not:NOT? val:VALUE { return {variable : expr.variable, mod : expr.mod, operator : 'is', negate : !!not, value : val}; }

IN_RELATION
    = expr:EXPRESSION SPACE+ not:NOT? 'in'i SPACE+ rlist:RANGE_LIST { return {variable : expr.variable, mod : expr.mod, operator : 'in', negate : !!not, rangeList : rlist}; }

WITHIN_RELATION
    = expr:EXPRESSION SPACE+ not:NOT? 'within'i SPACE+ rlist:RANGE_LIST { return {variable : expr.variable, mod : expr.mod, operator : 'within', negate : !!not, rangeList : rlist}; }

NOT
    = 'not'i SPACE+

EXPRESSION
    = variable:VARIABLE mod:MOD? { return {variable : variable, mod : mod || false}; }

MOD
    = SPACE+ 'mod'i SPACE+ val:VALUE { return val; }

VARIABLE
    = 'n'

RANGE_LIST
    = val:(RANGE / VALUE) ',' SPACE* list:RANGE_LIST { list.unshift(val); return list; }
    / val:(RANGE / VALUE) { return [val]; }

RANGE
    = min:VALUE '..' max:VALUE { return [min, max]; }

VALUE
    = FLOAT / INTEGER

FLOAT "float"
    = int:INTEGER '.' d:[0-9]+ { return parseFloat([int, '.', d.join('')].join('')); }

INTEGER "integer"
    = int:[0-9]+ { return parseInt(int.join('')); }

/* Uses the white space definition from UNICODE as specified
 * at http://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BPattern_White_Space%7D
 */
SPACE
    = [\u200E\u200F\u0009\u000D\u0085\u2028\u2029\u0020]
