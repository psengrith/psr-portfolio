const DATA_FILE = '/data.json';
const FULLNAME_ID = "fullname";
const SUM_ABOUT_ID = "sum-about";
const IMG_PROFILE_CLASS = "img-profile";
const SUM_CONTACTS_ID = 'sum-contacts';
const SUM_SOCIAL_ID_IDS = "sum-social-ids";
const SUM_PUB_ID = "sum-publications";
const SUM_EXP_ID = "sum-exp";
const SUM_EDU_ID = "sum-education";
const PROJECTS_ID = "projects";
const PROJECTS_GRID_ID = "grid-projects";
const TABEL_EXP_ID = "table-full-experiences";
const TABEL_PART_EXP_ID = "table-part-experiences";
const LIST_PUBLICATIONS = "list-publictions";
const FAV_BOOKS_ID = "fav-books";
const FAV_MOVIES_ID = "fav-movies";

const LINKEDIN_LINK_ID = "linkedin-link";
const FACEBOOK_LINK_ID = "facebook-link";
const INSTAGRAM_LINK_ID = "instagram-link";

function loadContent(data) {
    const fullNameEl = $("#" + FULLNAME_ID);
    if (null !== fullNameEl && typeof fullNameEl !== "undefined") {
        fullNameEl.html((data["last_name"] ?? "") + " " + data["first_name"].toUpperCase());
    }

    const sumAboutEl = $("#" + SUM_ABOUT_ID);
    if (null !== sumAboutEl && typeof sumAboutEl !== "undefined") {
        sumAboutEl.html(data["about"] ?? "");
    }

    const imgProfileEl = $("." + IMG_PROFILE_CLASS);
    if (null !== imgProfileEl && typeof imgProfileEl !== "undefined") {
        if (null != data["photo_url"] && "undefined" !== data["photo_url"])
            imgProfileEl.attr("src", data["photo_url"]);
    }

    const sumContactsEl = $("#" + SUM_CONTACTS_ID);
    if (null !== sumContactsEl && typeof sumContactsEl !== "undefined") {
        for (let contact of data["contacts"]) {
            sumContactsEl.append('<div><a class="white-text" href="' + contact["type"] + ':' + contact["value"] + '" target="_blank">' + contact["value"] + '</a></div>');
        };
    }

    const sumSocialIdsEl = $("#" + SUM_SOCIAL_ID_IDS);
    if (null !== sumSocialIdsEl && typeof sumSocialIdsEl !== "undefined") {
        for (let socialId of Object.values(data["social_ids"])) {
            let icon = "";
            switch (socialId["type"]) {
                case "linkedin":
                    icon = "fab fa-linkedin";
                    break;
                case "github":
                    icon = "fab fa-github";
                    break;
                case "gitlab":
                    icon = "fab fa-gitlab";
                    break;
                case "orcid":
                    icon = "fab fa-orcid";
                    break
                default:
                    break;
            }
            sumSocialIdsEl.append('<div><i class="' + icon + '"></i> <a class="white-text" href="' + socialId["link"] + '" target="_blank">' + socialId["name"] + '</a></div>');
        };
    }

    const sumExpEl = $("#" + SUM_EXP_ID);
    if (null !== sumExpEl && typeof sumExpEl !== "undefined") {
        for (let exp of data["experiences"]) {
            sumExpEl.append('<li><div class="font-bold">' + exp["duration"] + '<br\>' + exp["role"] + '</div><div class="smaller">' + exp["organization"] + '</div></li>');
        };
    }

    const sumEduEl = $("#" + SUM_EDU_ID);
    if (null !== sumEduEl && typeof sumEduEl !== "undefined") {
        for (let edu in data["education"]) {
            let eduData = data["education"][edu];
            sumEduEl.append('<li><div class="font-bold">' + eduData["field"] + '</div><div class="smaller"><a class="white-text" href="' + eduData["link"] + '" target="_blank">' + eduData["school"] + '</a></div></li>');
        };
    }

    const tableExpEl = $("#" + TABEL_EXP_ID + ">tbody");
    if (null !== tableExpEl && typeof tableExpEl !== "undefined") {
        for (let exp of data["experiences"]) {
            tableExpEl.append(`
<tr>
    <td class="text-nowrap">`+ exp["duration"] + `: </td>
    <td><div class="font-bold">`+ exp["organization"] + `</div><div>` + exp["role"] + `</div><div class="font-italic">` + exp["summary"] + `</div></td>
</tr>
                `)
        }
    }

    const tablePartExpEl = $("#" + TABEL_PART_EXP_ID + ">tbody");
    if (null !== tablePartExpEl && typeof tablePartExpEl !== "undefined") {
        for (let exp of data["experiences-part"]) {
            tablePartExpEl.append(`
<tr>
    <td class="text-nowrap">`+ exp["duration"] + `: </td>
    <td><div class="font-bold>`+ exp["organization"] + `</div><div>` + exp["role"] + `</div><div class="font-italic">` + exp["summary"] + `</div></td>
</tr>
                `)
        }
    }

    const listPublicationsEl = $("#" + LIST_PUBLICATIONS);
    if (null !== listPublicationsEl && typeof listPublicationsEl !== "undefined") {
        for (let pub of data["publications"]) {
            listPublicationsEl.append(`<li class="mt-2"><div class="font-bold">` + pub["title"] + `</div><a href="` + pub["link"] + `" target="_blank">` + pub["link"] + `</a><br\><div class="font-bold">Authorship (<a href="https://credit.niso.org" target="_blank">CRediT</a>): </div><span class="font-italic">` + pub["authorship"] + `</span></li>`)
        }
    }

    const projectsEl = $("#" + PROJECTS_ID);
    if (null !== projectsEl && typeof projectsEl !== "undefined") {
        let i = 0;
        for (let project of Object.values(data["projects"])) {
            let tags = "";
            if (null !== project["tags"] && "undefined" !== project["tags"]) {
                for (let tag of project["tags"]) {
                    tags += `<button type="button" class="btn btn-outline-tertiary" data-mdb-ripple-init>` + tag + `</button>`;
                }
            }

            const slide = `
<div class="carousel-item`+ (0 == i ? " active" : "") + `">
    <div class="testimonial text-center">
        <h4 class="text-uppercase text-center font-weight-bold"><a href="`+ project["link"] + `" target="_blank">` + project["name"] + `</a></h4>
        <p>`+ project["summary"] ?? "" + `</p>
    </div>
</div>`;
            projectsEl.append(slide);
            i += 1;
        };
    }

    const projectsGridEl = $("#" + PROJECTS_GRID_ID);
    if (null !== projectsGridEl && typeof projectsGridEl !== "undefined") {
        for (let project of Object.values(data["projects"])) {
            let tags = "";
            if (null !== project["tags"] && "undefined" !== project["tags"]) {
                for (let tag of project["tags"]) {
                    tags += `<button type="button" class="btn btn-outline-tertiary" data-mdb-ripple-init>` + tag + `</button>`;
                }
            }

            const slide = `
<div class="wrapper">
    <div class="testimonial">
        <img src="`+ project["cover_url"] + `"/>
        <div class="d-inline-block project-info">
            <h4 class="text-uppercase font-weight-bold"><a href="`+ project["link"] + `" target="_blank">` + project["name"] + `</a></h4>
            <p class="text-justify">`+ project["summary"] ?? "" + `</p>
        </div>
    </div>
</div>
`;
            projectsGridEl.append(slide);
        };
    }

    const favBooksEl = $("#" + FAV_BOOKS_ID);
    if (null !== favBooksEl && typeof favBooksEl !== "undefined") {
        for (let book of data["books"]) {
            let titleClasses = "card-title";
            if (book["title"].length > 30) {
                titleClasses = "card-title smaller";
            }
            favBooksEl.append(`
<div class="card">
    <img src="`+ book["cover_url"] + `" class="card-img-top"/>
    <div class="card-body text-center">
        <p class="`+ titleClasses + `">` + book["title"] + `</p>
        <span class="card-text smaller">by `+ book["author"] + `</span>
    </div>
</div>
`)
        }
    }

    const favMoviesEl = $("#" + FAV_MOVIES_ID);
    if (null !== favMoviesEl && typeof favMoviesEl !== "undefined") {
        for (let mov of data["movies-series"]) {
            let titleClasses = "card-title";
            if (mov["title"].length > 30) {
                titleClasses = "card-title smaller";
            }
            favMoviesEl.append(`
<div class="card">
    <img src="`+ mov["cover_url"] + `" class="card-img-top"/>
    <div class="card-body text-center">
        <p class="`+ titleClasses + `">` + mov["title"] + `</p>
        <span class="card-text smaller">by `+ mov["author"] + `</span>
    </div>
</div>
`)
        }
    }
}


$(document).ready(function () {
    $.getJSON(window.location.origin + DATA_FILE, loadContent);
});