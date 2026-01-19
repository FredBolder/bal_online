export function getTropicalFishColor(palette) {
    let colors = null;

    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",    // yellow-orange
                stripe: "#FF8C00",  // orange
                fin: "#4CAF50",     // tropical green
            }
            break;
        case 3:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",    // rich golden yellow
                stripe: "#1A1A1A",  // near-black
                fin: "#FFE680",     // pale golden / translucent yellow
            }
            break;
        case 4:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",    // deeper gold
                stripe: "#000000",  // black
                fin: "#FFEB99",     // lighter yellow
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",    // soft tropical light blue
                stripe: "#2A6F97",  // deeper blue
                fin: "#A9DCEC",     // pale translucent blue
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",    // silvery blue-gray
                stripe: "#5F6F7A",  // muted gray
                fin: "#E3EDF2",     // very light translucent
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",    // deep ocean blue
                stripe: "#0B2F4A",  // very dark blue (almost black)
                fin: "#3F7FA6",     // muted blue
            }
            break;
        case 8:
            // Clownfish
            colors = {
                body: "#FF8C1A",    // bright orange
                stripe: "#FFFFFF",  // clean white
                stripeOutline: "#000000",
                fin: "#FFB347",     // lighter orange
            }
            break;
        case 9:
            // Red Tail shark
            colors = {
                body: "#222222",    // deep matte black
                stripe: "#222222",  // no stripe
                fin: "#333333",     // very dark gray (almost black)
                tail: "#FF3B3B",    // vivid red
            }
            break;
        case 10:
            // Yellow Tail Acei Cichlid
            colors = {
                body: "#7FA8C3",    // soft bluish-gray
                stripe: "#5D7A9B",  // slightly darker blue-gray (subtle lateral stripe)
                fin: "#F8E14D",     // bright yellow
                tail: "#FFEA3C",    // vivid yellow
                eye: "#1C1C1C"      // dark black
            }
            break;
        case 11:
            // Siamese Algae Eater
            colors = {
                body: "#8FA1A8",    // cool blue-gray
                stripe: "#0E1418",  // deep near-black stripe
                fin: "#6F838B",     // translucent blue-gray
                tail: "#7C8F96",    // slightly brighter
                eye: "#020406"      // very dark, not pure black
            }
            break;
        case 12:
            // Yellow Tail Damselfish
            colors = {
                body: "#1F3FAE",    // reef blue
                stripe: "#2A4FCF",  // subtle lighter blue highlight stripe
                fin: "#2A4EC0",     // reef-blue
                tail: "#FFD83D",    // vivid yellow
                eye: "#05070D"      // dark navy-black
            }
            break;
        case 13:
            // Zebra Angelfish
            colors = {
                body: "#C7CDD1",    // silvery white / pale pearl
                stripe: "#1A1E23",  // deep charcoal black
                fin: "#9AA3A9",     // translucent silver-gray
                tail: "#8F979C",    // slightly darker translucent
                eye: "#B5342A"      // subtle reddish eye
            }
            break;
        case 14:
            // Smallmouth Grunt
            colors = {
                body: "#7E8A90",    // dark steel-gray
                stripe: "#F2D24B",  // saturated yellow horizontal stripes
                fin: "#EBCB55",     // slightly lighter, less saturated yellow
                tail: "#F7E06A",    // brightest yellow for motion & sun hit
                eye: "#0A0E12"
            }
            break;
        case 15:
            // Bicolor Anthias
            colors = {
                body: "#7A2E8E",       // purple / magenta
                upperBody: "#E6B72E",  // primary yellow
                stripe: "#5A1F6B",     // magenta very thin horizonal stripe
                fin: "#B043C6",        // soft white
                tail: "#B043C6",       // soft white 
                eye: "#1A1A1A"
            }
            break;
        default:
            // 1
            colors = {
                body: "#FF6347",    // red-orange
                stripe: "#FF4500",  // red-orange
                fin: "#FFD700",     // gold
            };
            break;
    }
    colors.upperBody = colors.upperBody ?? null;
    colors.tail = colors.tail ?? colors.fin;
    colors.eye = colors.eye ?? "#000000";
    colors.stripeOutline = colors.stripeOutline ?? null;
    return colors;
}