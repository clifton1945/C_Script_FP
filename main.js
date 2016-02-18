/**
 * Created by CLIF on 2/18/2016.
 */

const main = function () {
    const book = document.querySelector('.book');
    const C_Grp_Tmpl = '.ChptrReadGrps > div';
    const V_Grp_Tmpl = '.ChptrReadGrps > .cur .VerseReadGrps > div';
    const C_Grp_NL = book.querySelectorAll(C_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
    const V_Grp_NL = book.querySelectorAll(V_Grp_Tmpl); // NL:: 3 div.classes: pst, cur, fut
    const PST = 0;
    const CUR = 1;
    const FUT = 2;

    SET_All_Verse_Styles(StyleObj);
    BindHandlers(book);
    SET_All_Verse_Styles(StyleObj);
};
main();

