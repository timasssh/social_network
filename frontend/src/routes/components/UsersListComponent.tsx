import { UserComponent } from "./UserComponent"

export function UsersListComponent() {
    return <>
        <UserComponent followers={13} name="Timas da Silva" username="timas" />
        <UserComponent followers={5000} name="Mao Tsé Tung" username="mao" />
        <UserComponent followers={194} name="Carlos Marighella" username="carlos" />
        <UserComponent followers={190} name="Bell Hooks" username="bell_hooks" />
        <UserComponent followers={70} name="Ernesto Che Guevara" username="che_guevara" />
        <UserComponent followers={9} name="Professor Mário" username="mario" />
        <UserComponent followers={10} name="Debs Heloisi" username="debs" />
        <UserComponent followers={20} name="Cecília" username="cilia" />
        <UserComponent followers={550} name="Leonel Brizola" username="leo" />
        <UserComponent followers={1000} name="Jones Manoel" username="jones" />
        <UserComponent followers={400} name="Farol Brasil" username="farol_brasil" />
        <UserComponent followers={1000} name="Monkey D. Luffy" username="luffy" />
        <UserComponent followers={50} name="Portgas D. Ace" username="ace" />
        <UserComponent followers={3000} name="Vladmir Ilich Lênin" username="lenin" />
    </>
}