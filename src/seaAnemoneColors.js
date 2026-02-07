export function getSeaAnemoneColors(palette) {
    // The palettes 1-6 are suitable to combine with clownfish.    
    let colors = null;

    switch (palette) {
        case 2:
            // beige sand
            colors = {
                back: "rgba(170,155,120,0.50)",
                body: "rgba(205,190,150,1)",
                front: "rgba(235,220,175,0.95)"
            }
            break;
        case 3:
            // purple tips
            colors = {
                back: "rgba(145,130,165,0.50)",
                body: "rgba(175,160,195,1)",
                front: "rgba(205,185,235,0.95)"
            }
            break;
        case 4:
            // blue green
            colors = {
                back: "rgba(110,150,170,0.50)",
                body: "rgba(140,185,205,1)",
                front: "rgba(165,215,235,0.95)"
            }
            break;
        case 5:
            // pink rose
            colors = {
                back: "rgba(185,135,155,0.50)",
                body: "rgba(215,165,185,1)",
                front: "rgba(245,195,215,0.95)"
            }
            break;
        case 6:
            // olive green
            colors = {
                name: "olive_green",
                back: "rgba(120,145,110,0.50)",
                body: "rgba(155,180,140,1)",
                front: "rgba(185,210,165,0.95)"
            }
            break;
        case 7:
            // deep maroon
            colors = {
                back: "rgba(120,80,85,0.50)",
                body: "rgba(155,105,110,1)",
                front: "rgba(190,135,140,0.95)"
            }
            break;
        case 8:
            // golden brown
            colors = {
                back: "rgba(145,125,90,0.50)",
                body: "rgba(180,155,115,1)",
                front: "rgba(210,185,140,0.95)"
            }
            break;
        case 9:
            // fluoro green
            colors = {
                back: "rgba(110,160,120,0.45)",
                body: "rgba(140,200,150,1)",
                front: "rgba(180,245,190,0.95)"
            }
            break;
        case 10:
            // slate blue
            colors = {
                back: "rgba(110,120,135,0.50)",
                body: "rgba(145,160,180,1)",
                front: "rgba(175,195,220,0.95)"
            }
            break;
        case 11:
            // orange tan
            colors = {
                back: "rgba(175,130,95,0.50)",
                body: "rgba(210,165,120,1)",
                front: "rgba(240,195,145,0.95)"
            }
            break;
        case 12:
            // pale translucent
            colors = {
                back: "rgba(190,195,185,0.45)",
                body: "rgba(215,220,205,1)",
                front: "rgba(240,245,230,0.90)"
            }
            break;
        case 13:
            // dark moss
            colors = {
                back: "rgba(95,115,90,0.50)",
                body: "rgba(125,150,115,1)",
                front: "rgba(155,180,140,0.95)"
            }
            break;
        default:
            // green soft
            colors = {
                back: "rgba(130,170,155,0.55)",
                body: "rgba(170,200,185,1)",
                front: "rgba(180,230,210,0.95)"
            };
            break;
    }

    return colors;
}

